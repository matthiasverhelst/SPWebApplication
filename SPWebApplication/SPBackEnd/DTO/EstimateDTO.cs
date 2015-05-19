using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPBackEnd.DTO
{
    [Table("Estimate")]
    public class EstimateDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EstimateId { get; set; }

        public int ProductBacklogItemId { get; set; }
        
        public int ParticipantId { get; set; }
        
        [Required]
        public int Value { get; set; }
        
        [ForeignKey("ProductBacklogItemId")]
        public virtual ProductBacklogItemDTO ProductBacklogItem { get; set; }
        
        [ForeignKey("ParticipantId")]
        public virtual ParticipantDTO Participant { get; set; }
    }
}