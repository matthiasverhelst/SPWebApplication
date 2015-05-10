using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPBackEnd.DTO
{
    [Table("ProductBacklogItem")]
    public class ProductBacklogItemDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductBacklogItemId { get; set; }
        public int RoomId { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [ForeignKey("RoomId")]
        public virtual RoomDTO Room { get; set; }
        public virtual ICollection<EstimateDTO> Estimates { get; set; }
    }
}