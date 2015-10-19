﻿using SPInfrastructure.Context;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SPInfrastructure
{
    public class InitializeDb
    {
        public static void Run()
        {
            Database.SetInitializer<MainDbContext>(new DbInitializer());
            using (MainDbContext db = new MainDbContext())
            {
                db.Database.Initialize(false);
            }
        }

        private class DbInitializer : DropCreateDatabaseAlways<MainDbContext>
        {
            protected override void Seed(MainDbContext context)
            {

            }
        }
    }
}