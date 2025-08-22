import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, ArrowUpRight, ArrowDownLeft, ArrowRightLeft, Edit, Trash2, Search } from 'lucide-react';

export default function TransactionTab() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('all-directions');
  const [formDirection, setFormDirection] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  // Mock data
  const transactions = [
    {
      id: 1,
      date: '2025-01-20',
      time: '10:30',
      serial: 'LT-001-2024',
      item: 'Dell Latitude 5520',
      direction: 'Gudang → OPD',
      from: 'Gudang Utama',
      to: 'Diskominfo',
      location: 'Ruang Server',
      processedBy: 'Admin Gudang',
      notes: 'Pengiriman untuk keperluan upgrade sistem'
    },
    {
      id: 2,
      date: '2025-01-20',
      time: '09:15',
      serial: 'PR-045-2024',
      item: 'HP LaserJet Pro M404n',
      direction: 'OPD → Gudang',
      from: 'Dinas Kesehatan',
      to: 'Gudang Utama',
      location: 'Rak A-2',
      processedBy: 'Staff IT',
      notes: 'Pengembalian setelah selesai proyek'
    },
    {
      id: 3,
      date: '2025-01-19',
      time: '14:45',
      serial: 'RT-023-2024',
      item: 'Cisco ISR 4331',
      direction: 'OPD → OPD',
      from: 'Dinas Kesehatan',
      to: 'Dinas Pendidikan',
      location: 'Ruang Server Utama',
      processedBy: 'Teknisi Jaringan',
      notes: 'Pemindahan untuk optimalisasi jaringan'
    }
  ];

  const directions = ['Gudang → OPD', 'OPD → Gudang', 'OPD → OPD'];
  const opds = ['Diskominfo', 'Dinas Kesehatan', 'Dinas Pendidikan', 'Dinas Perhubungan'];

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'Gudang → OPD':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'OPD → Gudang':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'OPD → OPD':
        return <ArrowRightLeft className="h-4 w-4 text-blue-500" />;
      default:
        return <ArrowRightLeft className="h-4 w-4" />;
    }
  };

  const getDirectionBadge = (direction: string) => {
    switch (direction) {
      case 'Gudang → OPD':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Gudang → OPD</Badge>;
      case 'OPD → Gudang':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">OPD → Gudang</Badge>;
      case 'OPD → OPD':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">OPD → OPD</Badge>;
      default:
        return <Badge variant="secondary">{direction}</Badge>;
    }
  };

  const AddTransactionDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Transaction</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serial" className="text-right">
              Serial Number
            </Label>
            <Input id="serial" placeholder="e.g., LT-001-2024" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="direction" className="text-right">
              Direction
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select direction" />
              </SelectTrigger>
              <SelectContent>
                {directions.map((direction) => (
                  <SelectItem key={direction} value={direction}>
                    {direction}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="from" className="text-right">
              From
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gudang">Gudang</SelectItem>
                {opds.map((opd) => (
                  <SelectItem key={opd} value={opd}>
                    {opd}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="to" className="text-right">
              To
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gudang">Gudang</SelectItem>
                {opds.map((opd) => (
                  <SelectItem key={opd} value={opd}>
                    {opd}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input id="location" placeholder="Specific location" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="processedBy" className="text-right">
              Processed By
            </Label>
            <Input id="processedBy" placeholder="Your name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea id="notes" placeholder="Additional notes..." className="col-span-3" />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsAddDialogOpen(false)}>
            Create Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Transaction Management</h2>
          <p className="text-muted-foreground">Track all item movements and transfers</p>
        </div>
        <AddTransactionDialog />
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by serial number, item, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedDirection} onValueChange={setSelectedDirection}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by direction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-directions">All Directions</SelectItem>
                {directions.map((direction) => (
                  <SelectItem key={direction} value={direction.replace(/\s+/g, '-').replace(/→/g, 'to')}>
                    {direction}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Transactions Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Direction</TableHead>
                  <TableHead>From → To</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Processed By</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{transaction.date}</p>
                        <p className="text-xs text-muted-foreground">{transaction.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">{transaction.serial}</p>
                        <p className="font-medium text-sm">{transaction.item}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDirectionIcon(transaction.direction)}
                        {getDirectionBadge(transaction.direction)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">{transaction.from}</span>
                        <span className="mx-2 text-muted-foreground">→</span>
                        <span className="font-medium">{transaction.to}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {transaction.location}
                    </TableCell>
                    <TableCell className="text-sm">
                      {transaction.processedBy}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-32 truncate text-sm" title={transaction.notes}>
                        {transaction.notes}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
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
    </div>
  );
}