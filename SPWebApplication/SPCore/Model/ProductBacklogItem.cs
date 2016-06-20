using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SPCore.Model
{
    [Table("ProductBacklogItem")]
    public class ProductBacklogItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductBacklogItemId { get; set; }
        
        [Required]
        public string Title { get; set; }

        public string FinalEstimation { get; set; }

        public virtual ICollection<Estimate> Estimates { get; set; }
    }
}