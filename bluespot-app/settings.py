"""Config"""

### Variables
DATABASE = 'database.db'
PER_PAGE = 30
DEBUG = True
SECRET_KEY = 'burtechono' # secret key for app

# mysql settings
MYSQL_DATABASE_HOST = 'localhost'
MYSQL_DATABASE_PORT = 3306
MYSQL_DATABASE_USER = 'goomaral'
MYSQL_DATABASE_PASSWORD = 'bluespot'
MYSQL_DATABASE_DB = 'bluespot'
MYSQL_DATABASE_CHARSET = 'utf8'
# format is dialect+driver://username:password@host:port/database
# SQLALCHEMY_DATABASE_URI = 'mysql://goomaral:bluespot@localhost/bluespot'
SQLALCHEMY_DATABASE_URI = 'sqlite+pysqlite:///' + DATABASE