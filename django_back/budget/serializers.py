from rest_framework import serializers
from .models import Budget, Expense

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ('id', 'budget_title', 'budget_amount')


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'expense_title', 'expense_amount', 'expense_budget_id')