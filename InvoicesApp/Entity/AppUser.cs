using System;
using System.Collections.Generic;

namespace InvoicesApp.Entity
{
  public class AppUser
  {
    public AppUser()
    {
      Id = Guid.NewGuid();
    }

    public Guid Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public virtual ICollection<Invoice> Invoices { get; set; }
  }
}