import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Package, Warehouse, Building2, Eye, Edit } from 'lucide-react';

export default function StockTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Mock data
  const stockSummary = {
    total: 1250,
    warehouse: 450,
    opd: 800,
    opdLabel: 'Di OPD'
  };

  const items = [
    {
      id: 1,
      serial: 'LT-001-2024',
      category: 'Laptop',
      brand: 'Dell',
      model: 'Latitude 5520',
      condition: 'Layak pakai',
      location: { type: 'OPD', opd: 'Diskominfo', specific: 'Ruang Server' },
      entryDate: '2024-01-15',
      lastTransaction: '2024-12-20'
    },
    {
      id: 2,
      serial: 'PR-045-2024',
      category: 'Printer',
      brand: 'HP',
      model: 'LaserJet Pro M404n',
      condition: 'Layak pakai',
      location: { type: 'Gudang', specific: 'Rak A-2' },
      entryDate: '2024-02-10',
      lastTransaction: '2024-11-15'
    },
    {
      id: 3,
      serial: 'RT-023-2024',
      category: 'Router',
      brand: 'Cisco',
      model: 'ISR 4331',
      condition: 'Rusak sebagian',
      location: { type: 'OPD', opd: 'Dinas Kesehatan', specific: 'Puskesmas 1' },
      entryDate: '2024-03-05',
      lastTransaction: '2024-12-18'
    }
  ];

  const categories = ['Laptop', 'Printer', 'Router', 'Switch', 'CCTV'];
  const opds = ['Diskominfo', 'Dinas Kesehatan', 'Dinas Pendidikan'];

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'Layak pakai':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Layak pakai</Badge>;
      case 'Rusak sebagian':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Rusak sebagian</Badge>;
      case 'Rusak/Hilang':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rusak/Hilang</Badge>;
      default:
        return <Badge variant="secondary">{condition}</Badge>;
    }
  };

  const getLocationBadge = (location: { type: string; opd?: string; specific?: string }) => {
    if (location.type === 'Gudang') {
      return <Badge variant="outline" className="text-blue-600 border-blue-300">Gudang</Badge>;
    } else {
      return <Badge variant="outline" className="text-purple-600 border-purple-300">{location.opd}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{stockSummary.total.toLocaleString()}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Di Gudang</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stockSummary.warehouse.toLocaleString()}</p>
              </div>
              <Warehouse className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">{stockSummary.opdLabel}</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stockSummary.opd.toLocaleString()}</p>
              </div>
              <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Stock Inventory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by serial, brand, model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="gudang">Gudang</SelectItem>
                {opds.map((opd) => (
                  <SelectItem key={opd} value={opd.toLowerCase().replace(/\s+/g, '-')}>
                    {opd}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Items Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Serial Number</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand & Model</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Transaction</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="font-mono text-sm">{item.serial}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.brand}</p>
                        <p className="text-sm text-muted-foreground">{item.model}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getConditionBadge(item.condition)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getLocationBadge(item.location)}
                        {item.location.specific && (
                          <p className="text-xs text-muted-foreground">{item.location.specific}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.lastTransaction}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Serial Lookup */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Quick Serial Lookup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input placeholder="Enter serial number for quick lookup..." />
            </div>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}