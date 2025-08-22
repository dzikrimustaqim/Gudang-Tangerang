import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Warehouse, 
  Building2, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRightLeft,
  Search,
  Plus,
  Filter,
  Download,
  Settings
} from 'lucide-react';
import StockTab from '@/components/dashboard/StockTab';
import InventoryTab from '@/components/dashboard/InventoryTab';
import TransactionTab from '@/components/dashboard/TransactionTab';
import MasterDataTab from '@/components/dashboard/MasterDataTab';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { ModeToggle } from '@/components/mode-toggle';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">Warehouse Management</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Stock
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Warehouse className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="master" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Master Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="stock" className="space-y-6">
            <StockTab />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <InventoryTab />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionTab />
          </TabsContent>

          <TabsContent value="master" className="space-y-6">
            <MasterDataTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}