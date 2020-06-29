import re

from ibm_db_dbi import Error


db2_error_re = re.compile('^(\w+).*(SQL\d{4,5}N)\s{2}(.*)\s{2}SQLSTATE=(\d+)[\s\\\\r]+SQLCODE=(-\d+)')


class DB2Error(Exception):
    def __init__(self, message, sql_error, sql_message, sql_state, sql_code):
        """IBM DB error that hold additional fields for the SQL Error,
           SQL Message, SQL State, and SQL Code.

        :param message: the exception message
        :param sql_error: the sql error type
        :param sql_message: sql message, eg (SQL0204N)
        :param sql_state: state code, eg(42704)
        :param sql_code: sql code, eg(-204)
        """
        super().__init__(message)
        self.sql_err = sql_error
        self.sql_message = sql_message
        self.sql_state = sql_state
        self.sql_code = sql_code


    @staticmethod
    def parse(exception):
        """Returns a DB2Error parsed from the `exception`.

        :param exception: ibm_dbi_db Error
        """
        if not isinstance(exception, Error):
            return None

        match = db2_error_re.match(exception._message)
        if match is None:
            return None

        groups = match.groups()
        message = groups[2]
        sql_error = groups[0]
        sql_message = groups[1]
        sql_state = int(groups[3])
        sql_code = int(groups[4])
        return DB2Error(message, sql_error, sql_message, sql_state, sql_code)

    @staticmethod
    def try_parse(exception):
        """Try to parse the exception to a DB2Error and return, otherwise
        return the given exception unchanged.

        :param exception: ibm_dbi_db Error
        """
        err = DB2Error.parse(exception)
        if err is None:
            return exception
        return err
