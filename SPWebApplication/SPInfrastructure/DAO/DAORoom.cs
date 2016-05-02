﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using SPInfrastructure.Context;
using SPCore.Model;

namespace SPInfrastructure.DAO
{
    public class DAORoom
    {
        private MainDbContext _db;
        
        public DAORoom(MainDbContext db)
        {
            _db = db;
        }

        public bool CreateRoom(Room room)
        {
            _db.Rooms.Add(room);
            int result = _db.SaveChanges();
            return (result > 0);
        }
    }
}