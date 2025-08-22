import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUpRight, ArrowDownLeft, ArrowRightLeft, MapPin, Calendar, User } from 'lucide-react';

interface ItemHistoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}

export default function ItemHistoryDialog({ isOpen, onClose, item }: ItemHistoryDialogProps) {
  // Mock transaction history data - dalam implementasi nyata akan dari API
  const transactionHistory = [
    {
      id: 1,
      date: '2024-01-15',
      time: '08:00',
      direction: 'Item Entry',
      from: '-',
      to: 'Gudang Utama',
      location: 'Rak A1',
      notes: 'Barang baru masuk dari vendor',
      processedBy: 'Admin Gudang'
    },
    {
      id: 2,
      date: '2024-02-10',
      time: '10:30',
      direction: 'Gudang → OPD',
      from: 'Gudang Utama',
      to: 'Diskominfo',
      location: 'Ruang IT - Meja 1',
      notes: 'Untuk kebutuhan administrasi',
      processedBy: 'Pak Budi'
    },
    {
      id: 3,
      date: '2024-03-15',
      time: '14:20',
      direction: 'OPD → OPD',
      from: 'Diskominfo',
      to: 'Dinas Kesehatan',
      location: 'Ruang Server',
      notes: 'Dipindahkan karena kebutuhan upgrade server',
      processedBy: 'Ibu Sari'
    },
    {
      id: 4,
      date: '2024-04-01',
      time: '09:15',
      direction: 'OPD → Gudang',
      from: 'Dinas Kesehatan',
      to: 'Gudang Utama',
      location: 'Rak B2',
      notes: 'Dikembalikan untuk maintenance',
      processedBy: 'Pak Ahmad'
    }
  ];

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'Gudang → OPD':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      case 'OPD → Gudang':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'OPD → OPD':
        return <ArrowRightLeft className="h-4 w-4 text-orange-600" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-600" />;
    }
  };

  const getDirectionBadge = (direction: string) => {
    switch (direction) {
      case 'Gudang → OPD':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Keluar ke OPD</Badge>;
      case 'OPD → Gudang':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Kembali ke Gudang</Badge>;
      case 'OPD → OPD':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Pindah OPD</Badge>;
      case 'Item Entry':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Barang Masuk</Badge>;
      default:
        return <Badge variant="secondary">{direction}</Badge>;
    }
  };

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-lg font-semibold">Riwayat Transaksi Item</div>
              <div className="text-sm text-muted-foreground font-mono">{item.serial}</div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Item Info Summary */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Item</div>
              <div className="font-medium">{item.brand} {item.model}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Kategori</div>
              <div className="font-medium">{item.category}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Lokasi Saat Ini</div>
              <div className="font-medium">{item.location}</div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold">Riwayat Pergerakan</h3>
            <Badge variant="outline">{transactionHistory.length} Transaksi</Badge>
          </div>

          <ScrollArea className="h-[400px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Tanggal & Waktu</TableHead>
                  <TableHead>Jenis Transaksi</TableHead>
                  <TableHead>Dari</TableHead>
                  <TableHead>Ke</TableHead>
                  <TableHead>Lokasi Spesifik</TableHead>
                  <TableHead>Catatan</TableHead>
                  <TableHead>Diproses Oleh</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionHistory.map((transaction, index) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <div className="font-medium text-sm">{transaction.date}</div>
                          <div className="text-xs text-muted-foreground">{transaction.time}</div>
                        </div>
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
                        {transaction.from === '-' ? (
                          <span className="text-muted-foreground italic">Masuk sistem</span>
                        ) : (
                          transaction.from
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{transaction.to}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {transaction.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground max-w-48 truncate" title={transaction.notes}>
                        {transaction.notes}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <User className="h-3 w-3" />
                        {transaction.processedBy}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* Summary Stats */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-blue-600">4</div>
              <div className="text-xs text-muted-foreground">Total Transaksi</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-green-600">1</div>
              <div className="text-xs text-muted-foreground">Keluar ke OPD</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-orange-600">1</div>
              <div className="text-xs text-muted-foreground">Pindah antar OPD</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-purple-600">2</div>
              <div className="text-xs text-muted-foreground">Lokasi Berbeda</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}