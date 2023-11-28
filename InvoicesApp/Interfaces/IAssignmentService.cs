using System;
using System.Collections.Generic;
using InvoicesApp.Models;

namespace InvoicesApp.Interfaces
{
    public interface IAssignmentService
    {
        public void AddAssignment(List<AddAssignmentIncomeModel> model, Guid invoiceId);
    }
}