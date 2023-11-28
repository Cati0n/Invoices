using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace InvoicesApp.Entity
{
  public class Assignment
  {
    public Assignment()
    {
      Id = Guid.NewGuid();
    }

    public Guid Id { get; set; }

    public double Quantity { get; set; }

    public string Unit { get; set; }  

    public string AssignmentDescription { get; set; }

    public double Price { get; set; }

    public double Total { get; set; }

    public Guid InvoiceId { get; set; }

    [ForeignKey("InvoiceId")]
    public virtual Invoice Invoice { get; set; }
  }
}
