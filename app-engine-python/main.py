import datetime


from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def root():
    # For the sake of example, use static information to inflate the template.
    # This will be replaced with real information in later steps.
    dummy_times = [datetime.datetime(2018, 1, 1, 10, 0, 0),
                   datetime.datetime(2018, 1, 2, 10, 30, 0),
                   datetime.datetime(2018, 1, 3, 11, 0, 0),
                   ]

    return render_template('index.html', times=dummy_times)

@app.route("/hello")
def hello():
    return "hello"
  
@app.route("/dir")
def dir_str():
    import google
    from google.cloud import datastore
    datastore_client = datastore.Client()
    from google.appengine.api import memcache
    from google.appengine.ext import ndb
    return str(dir())

@app.route("/hoge")
def hoge():
    from google.appengine.api import memcache
    memcache.set("hoge-key", "hoge-value")
    #memcache.set("hoge-key", "hoge-value",namespace="hoge-namespace")
    return "memcache"
    #x = memcache.get("hoge-key", namespace="hoge-namespace")
    #y = memcache.get("hoge-key")
    #return str(x)
    


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
    

