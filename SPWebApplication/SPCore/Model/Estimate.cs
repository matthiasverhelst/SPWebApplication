using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPCore.Model
{
    [Table("Estimate")]
    public class Estimate
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EstimateId { get; set; }
        
        [Required]
        public string Value { get; set; }
        
        [ForeignKey("ParticipantId")]
        public virtual User Participant { get; set; }
    }
}