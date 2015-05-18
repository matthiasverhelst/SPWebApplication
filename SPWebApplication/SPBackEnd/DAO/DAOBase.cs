using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SPBackEnd.DAO
{
    public class DAOBase<T> : IDisposable where T : DbContext, new()
    {
        private T _db;
        private bool disposedValue;

        protected T db
        {
            get
            {
                if (_db == null)
                {
                    _db = new T();
                    _db.Configuration.AutoDetectChangesEnabled = false;
                    _db.Configuration.ValidateOnSaveEnabled = false;
                }
                return _db;
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposedValue && disposing && _db != null)
                _db.Dispose();
            this.disposedValue = true;
        }

        void IDisposable.Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}