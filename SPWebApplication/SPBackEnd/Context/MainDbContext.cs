using SPBackEnd.DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SPBackEnd.Context
{
    public class MainDbContext : DbContext
    {
        public DbSet<EstimateDTO> Estimates { get; set; }
        public DbSet<ParticipantDTO> Participants { get; set; }
        public DbSet<ProductBacklogItemDTO> ProductBacklogItems { get; set; }
        public DbSet<RoomDTO> Rooms { get; set; }
        public DbSet<UserDTO> Users { get; set; }
    }
}