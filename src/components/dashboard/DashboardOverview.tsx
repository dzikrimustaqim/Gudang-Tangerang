import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  Warehouse, 
  Building2, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export default function DashboardOverview() {
  // Mock data for demonstration
  const summary = {
    total_items: 1250,
    items_in_warehouse: 450,
    items_in_opd: 800,
    total_transactions: 2340,
    items_by_condition: {
      "Layak pakai": 950,
      "Rusak sebagian": 200,
      "Rusak/Hilang": 100
    },
    items_by_category: [
      { category_name: "Laptop", count: 320 },
      { category_name: "Printer", count: 180 },
      { category_name: "Router", count: 150 },
      { category_name: "Switch", count: 120 },
      { category_name: "CCTV", count: 480 }
    ],
    items_by_opd: [
      { opd_name: "Diskominfo", count: 280 },
      { opd_name: "Dinas Kesehatan", count: 320 },
      { opd_name: "Dinas Pendidikan", count: 200 }
    ]
  };

  const recentTransactions = [
    { id: 1, item: "Dell Latitude 5520", direction: "Gudang → OPD", opd: "Diskominfo", date: "2025-01-20" },
    { id: 2, item: "HP LaserJet Pro", direction: "OPD → Gudang", opd: "Dinas Kesehatan", date: "2025-01-20" },
    { id: 3, item: "Cisco Switch 24P", direction: "OPD → OPD", opd: "Dinas Pendidikan", date: "2025-01-19" },
  ];

  const warehousePercentage = Math.round((summary.items_in_warehouse / summary.total_items) * 100);
  const opdPercentage = Math.round((summary.items_in_opd / summary.total_items) * 100);
  const goodConditionPercentage = Math.round((summary.items_by_condition["Layak pakai"] / summary.total_items) * 100);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Total Items
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {summary.total_items.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              In Warehouse
            </CardTitle>
            <Warehouse className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
              {summary.items_in_warehouse.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">
              {warehousePercentage}% of total inventory
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
              In OPD Units
            </CardTitle>
            <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
              {summary.items_in_opd.toLocaleString()}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              {opdPercentage}% deployed to units
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">
              Transactions
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {summary.total_transactions.toLocaleString()}
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              +8% this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Item Condition Analysis */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Item Condition Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Layak pakai</span>
                </div>
                <span className="text-sm font-medium">{summary.items_by_condition["Layak pakai"]}</span>
              </div>
              <Progress value={goodConditionPercentage} className="h-2" />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Rusak sebagian</span>
                </div>
                <span className="text-sm font-medium">{summary.items_by_condition["Rusak sebagian"]}</span>
              </div>
              <Progress value={16} className="h-2" />

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Rusak/Hilang</span>
                </div>
                <span className="text-sm font-medium">{summary.items_by_condition["Rusak/Hilang"]}</span>
              </div>
              <Progress value={8} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Items by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary.items_by_category.map((category, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="font-medium">{category.category_name}</span>
                  <Badge variant="secondary">{category.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OPD Distribution */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-600" />
              Items by OPD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {summary.items_by_opd.map((opd, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span className="font-medium">{opd.opd_name}</span>
                  <Badge variant="outline">{opd.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{transaction.item}</p>
                    <p className="text-xs text-muted-foreground">{transaction.opd}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {transaction.direction === "Gudang → OPD" && <ArrowUpRight className="h-4 w-4 text-red-500" />}
                    {transaction.direction === "OPD → Gudang" && <ArrowDownLeft className="h-4 w-4 text-green-500" />}
                    {transaction.direction === "OPD → OPD" && <ArrowUpRight className="h-4 w-4 text-blue-500" />}
                    <Badge variant="outline" className="text-xs">
                      {transaction.date}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}