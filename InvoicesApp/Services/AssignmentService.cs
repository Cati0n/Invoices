using System;
using System.Collections.Generic;
using InvoicesApp.Entity;
using InvoicesApp.Interfaces;
using InvoicesApp.Models;

namespace InvoicesApp.Services
{
    public class AssignmentService : IAssignmentService
    {
        private readonly ApplicationDbContext _dbContext = new ApplicationDbContext();

        public void AddAssignment(List<AddAssignmentIncomeModel> model, Guid invoiceId)
        {
            foreach (var item in model)
            {
                var assignment = new Assignment
                {
                    AssignmentDescription = item.Assignment,
                    InvoiceId = invoiceId,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    Unit = item.Unit,
                    Total = item.Total
                };

                _dbContext.Assignments.Add(assignment);
            }
            _dbContext.SaveChanges();
        }
    }
}