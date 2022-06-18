from django.contrib import admin
from .models import Budget, Expense

@admin.register(Budget)
class BudgetAdmin(admin.ModelAdmin):
    list_display = ('budget_title', 'budget_amount')


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('expense_title', 'expense_amount', 'expense_budget_id')

# Register your models here.
