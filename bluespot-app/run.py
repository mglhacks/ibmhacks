#!flask/bin/python

"""Run bluespot"""

from bluespot import app
app.run(host="0.0.0.0", debug=True)
