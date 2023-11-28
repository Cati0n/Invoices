using InvoicesApp.Models;
using System;
using System.Collections.Generic;
using InvoicesApp.Entity;

namespace InvoicesApp.Interfaces
{
  public interface IInvoiceService
  {
    NewlyCreatedObject AddInvoice(AddInvoiceIncomeModel model);

     InvoiceViewModel GetInvoice(Guid id);

     List<Invoice> GetInvoices();
  }
}
