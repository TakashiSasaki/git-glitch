class DatastoreStore extends expressSession.Store {
  //ds: Datastore;
  //kind: string;
  //expirationMs: number;
  constructor(DataStoreOptions = {}) {
    super();
    this.ds = (options.dataset || options.datastore);
    if (!this.ds) {
      throw new Error('No dataset provided to Datastore Session.');
    }
    this.kind = options.kind || 'Session';

    if (options.expirationMs) {
      if (
        typeof options.expirationMs !== typeof 0 ||
        options.expirationMs < 0
      ) {
        throw new Error(
          'invalid value for option expirationMs: must be an integer greater than 0'
        );
      }
      this.expirationMs = Number(options.expirationMs);
    } else {
      this.expirationMs = 0;
    }
  }

  get  (
    sid,
    callback
  )  {
    this.ds.get(this.ds.key([this.kind, sid]), (err, entity) => {
      if (err) {
        return callback(err);
      }
      if (!entity) {
        return callback(null);
      }

      let result;
      try {
        result = JSON.parse(entity.data);
      } catch (er) {
        return callback(er);
      }

      if (!entity.createdAt || !this.expirationMs) {
        return callback(null, result);
      }

      const createdAtMs = entity.createdAt.valueOf();
      const expiresAtMs = createdAtMs + this.expirationMs;
      const nowMs = new Date().valueOf();

      if (expiresAtMs <= nowMs) {
        this.destroy(sid, err => {
          if (err) {
            return callback(err);
          }
          return callback(null);
        });
        return;
      }

      return callback(null, result);
    });
  };

  set (
    sid,
    sess,
    callback
  )  {
    callback = callback || (() => {});
    let sessJson;

    try {
      sessJson = JSON.stringify(sess);
    } catch (err) {
      return callback(err);
    }

    const createdAt = new Date();
    const data = [
      {
        name: 'data',
        value: sessJson,
        excludeFromIndexes: true,
      },
      {
        name: 'createdAt',
        value: createdAt,
      },
    ];

    this.ds.save(
      {
        key: this.ds.key([this.kind, sid]),
        data,
      },
      callback
    );
  };

  destroy (sid, callback?: (err: Error | null) => void) => {
    this.ds.delete(this.ds.key([this.kind, sid]), callback as DeleteCallback);
  };
}