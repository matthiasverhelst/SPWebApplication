using SPCore.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SPInfrastructure.Context
{
    public class MainDbContext : DbContext
    {
        public DbSet<Estimate> Estimates { get; set; }
        public DbSet<User> Participants { get; set; }
        public DbSet<ProductBacklogItem> ProductBacklogItems { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<User> Users { get; set; }
    }
}