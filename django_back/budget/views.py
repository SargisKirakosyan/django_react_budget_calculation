from rest_framework import viewsets
from .serializers import BudgetSerializer, ExpenseSerializer
from .models import Budget, Expense


# Create your views here.

class BudgetView(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer
    queryset = Budget.objects.all()


class ExpenseView(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    queryset = Expense.objects.all()
