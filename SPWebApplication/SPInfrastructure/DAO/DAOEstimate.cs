﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using SPInfrastructure.Context;
using SPCore.Model;

namespace SPInfrastructure.DAO
{
    public class DAOEstimate
    {
        private MainDbContext _db;
        
        public DAOEstimate(MainDbContext db)
        {
            _db = db;
        }

        public bool StoreFinalEstimate(Estimate Estimate)
        {
            _db.Estimates.Add(Estimate);
            int result = _db.SaveChanges();
            return (result > 0);
        }
    }
}