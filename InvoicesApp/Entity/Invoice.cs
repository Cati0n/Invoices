using System;
using System.Collections.Generic;

namespace InvoicesApp.Entity
{
  public class Invoice
  {
    public Invoice()
    {
      Id = Guid.NewGuid();
    }

    public Guid Id { get; set; }

    public string Client_FirstName { get; set; }

    public string Client_LastName { get; set; }

    public string Client_Email { get; set; }

    public string Client_PhoneNumber { get; set; }

    public string Client_Address { get; set; }

    public string IssueDate { get; set; }

    public string DueDate { get; set; }

    public string UpdatedDate { get; set; }

    public Guid UserId { get; set; }

    public virtual AppUser AppUser { get; set; }

    public virtual ICollection<Assignment> Assignments { get; set; }
  }
}
