using System.Collections.Generic;

namespace InvoicesApp.Models
{
  public class InvoiceViewModel
  {
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string PhoneNumber { get; set; }

    public string Address { get; set; } 

    public string IssueDate { get; set; }

    public string DueDate { get; set; }

    public List<AssignmentViewModel> Assignments { get; set; }
  }
}
  