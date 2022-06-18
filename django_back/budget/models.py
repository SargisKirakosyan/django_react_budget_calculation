from django.db import models

# Create your models here.

class Budget(models.Model):
    budget_title = models.CharField(max_length=120)
    budget_amount = models.IntegerField()

    def __str__(self):
        return self.budget_title


class Expense(models.Model):
    expense_title =  models.CharField(max_length=120)
    expense_amount = models.IntegerField()
    expense_budget_id = models.ForeignKey('Budget',
    on_delete=models.CASCADE,)

    def __str__(self):
        return self.expense_title