using System;
using System.Collections.Generic;
using System.Linq;
using InvoicesApp.Entity;
using InvoicesApp.Interfaces;
using InvoicesApp.Models;

namespace InvoicesApp.Services
{
  public class InvoiceService : IInvoiceService
  {
    private readonly ApplicationDbContext _dbContext = new ApplicationDbContext();

    public NewlyCreatedObject AddInvoice(AddInvoiceIncomeModel model)
    {
      //TODO: Add CreatedBy based on Google auth

      var invoice = new Invoice
      {
        Client_FirstName = model.Client_FirstName,
        Client_LastName = model.Client_LastName,
        Client_Email = model.Client_Email,
        Client_PhoneNumber = model.Client_PhoneNumber,
        Client_Address = model.Client_Address,
        IssueDate = model.IssueDate.ToShortDateString(),
        DueDate = model.DueDate.ToShortDateString()
      };

      _dbContext.Invoices.Add(invoice);
      _dbContext.SaveChanges();

      var newlyCreatedObject = new NewlyCreatedObject
      {
        Guid = invoice.Id
      };

      return newlyCreatedObject;
    }

    public InvoiceViewModel GetInvoice(Guid id)
    {
      //TODO: Add validation to select only by user
      var invoiceDb = _dbContext.Invoices.FirstOrDefault(i => i.Id == id);

      var assignments = _dbContext.Assignments.Where(a => a.InvoiceId == invoiceDb.Id).Select(a =>
        new AssignmentViewModel
        {
          Assignment = a.AssignmentDescription,
          Price = a.Price,
          Quantity = a.Quantity,
          Unit = a.Unit,
          Total = a.Total
        }).ToList();

      if (invoiceDb == null)
      {
        throw new Exception("No invoices with such id {id} have been found.");
      }

      var invoiceToReturn = new InvoiceViewModel
      {
        FirstName = invoiceDb.Client_FirstName,
        LastName = invoiceDb.Client_LastName,
        Address = invoiceDb.Client_Address,
        IssueDate = invoiceDb.IssueDate,
        DueDate = invoiceDb.DueDate,
        Email = invoiceDb.Client_Email,
        PhoneNumber = invoiceDb.Client_PhoneNumber,
        Assignments = assignments
      };

      return invoiceToReturn;
    }

    public List<Invoice> GetInvoices()
    {
      //TODO: UserViewModel can see only invoices that he/she created 

      var invoices = _dbContext.Invoices.ToList();
      
      return invoices;
    }
  }
}
