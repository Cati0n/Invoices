using System;

namespace InvoicesApp.Models
{
  public class AddInvoiceIncomeModel
  {
    public string Client_InvoiceNumber { get; set; }
    public string Client_RegNumber { get; set; }

    public string Client_CompanyName { get; set; }
    public string Client_FirstName { get; set; }
    public string Client_LastName { get; set; }

    public string Client_Email { get; set; }

    public string Client_PhoneNumber { get; set; }

    public string Client_Address { get; set; }

    public DateTime IssueDate { get; set; }

    public DateTime DueDate { get; set; }
  }
}
