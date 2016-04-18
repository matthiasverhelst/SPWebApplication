using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPCore.DTO
{
    [Table("Estimate")]
    public class EstimateDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EstimateId { get; set; }
        
        [Required]
        public int Value { get; set; }
        
        [ForeignKey("ProductBacklogItemId")]
        public virtual ProductBacklogItemDTO ProductBacklogItem { get; set; }
        
        [ForeignKey("ParticipantId")]
        public virtual UserDTO Participant { get; set; }
    }
}