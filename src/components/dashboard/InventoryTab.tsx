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
import { Plus, Package, Edit, Trash2, Search } from 'lucide-react';

export default function InventoryTab() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all-categories');
  const [selectedCondition, setSelectedCondition] = useState('all-conditions');

  // Mock data
  const items = [
    {
      id: 1,
      serial: 'LT-001-2024',
      category: 'Laptop',
      brand: 'Dell',
      model: 'Latitude 5520',
      condition: 'Layak pakai',
      description: 'Laptop untuk keperluan administrasi',
      entryDate: '2024-01-15',
      location: 'Gudang Utama - Rak A1'
    },
    {
      id: 2,
      serial: 'PR-045-2024',
      category: 'Printer',
      brand: 'HP',
      model: 'LaserJet Pro M404n',
      condition: 'Layak pakai',
      description: 'Printer laser monokrom',
      entryDate: '2024-02-10',
      location: 'Diskominfo - Ruang IT'
    },
    {
      id: 3,
      serial: 'RT-023-2024',
      category: 'Router',
      brand: 'Cisco',
      model: 'ISR 4331',
      condition: 'Rusak sebagian',
      description: 'Router untuk jaringan utama',
      entryDate: '2024-03-05',
      location: 'Dinas Kesehatan - Server Room'
    }
  ];

  const categories = ['Laptop', 'Printer', 'Router', 'Switch', 'CCTV'];
  const conditions = ['Layak pakai', 'Rusak sebagian', 'Rusak/Hilang'];

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      alert(`Item dengan ID ${id} telah dihapus`);
    }
  };

  const handleSaveItem = () => {
    alert('Item baru berhasil ditambahkan!');
    setIsAddDialogOpen(false);
  };

  const handleUpdateItem = () => {
    alert('Item berhasil diperbarui!');
    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Manajemen Inventaris</h2>
          <p className="text-muted-foreground">Kelola semua item inventaris dalam sistem</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Tambah Item Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Item Inventaris Baru</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serial" className="text-right">
                  Nomor Serial
                </Label>
                <Input id="serial" placeholder="contoh: LT-001-2024" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Kategori
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  Merek
                </Label>
                <Input id="brand" placeholder="contoh: Dell" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model" className="text-right">
                  Model
                </Label>
                <Input id="model" placeholder="contoh: Latitude 5520" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="condition" className="text-right">
                  Kondisi
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih kondisi" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition.toLowerCase().replace(/\s+/g, '-')}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Deskripsi
                </Label>
                <Textarea id="description" placeholder="Deskripsi item..." className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleSaveItem}>
                Tambah Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Item Inventaris
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari item berdasarkan serial, merek, atau model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter berdasarkan kondisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-conditions">Semua Kondisi</SelectItem>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition.toLowerCase().replace(/\s+/g, '-')}>
                    {condition}
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
                  <TableHead>Nomor Serial</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Merek & Model</TableHead>
                  <TableHead>Kondisi</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Tanggal Masuk</TableHead>
                  <TableHead>Lokasi Saat Ini</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="font-mono text-sm font-medium">{item.serial}</div>
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
                      <div className="max-w-32 truncate" title={item.description}>
                        {item.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {item.entryDate}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{item.location}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(item.id)}
                        >
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Item Inventaris</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-serial" className="text-right">
                Nomor Serial
              </Label>
              <Input 
                id="edit-serial" 
                defaultValue={editingItem?.serial}
                placeholder="Masukkan nomor serial" 
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-brand" className="text-right">
                Merek
              </Label>
              <Input 
                id="edit-brand" 
                defaultValue={editingItem?.brand}
                placeholder="Masukkan merek" 
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-model" className="text-right">
                Model
              </Label>
              <Input 
                id="edit-model" 
                defaultValue={editingItem?.model}
                placeholder="Masukkan model" 
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Kategori
              </Label>
              <Select defaultValue={editingItem?.category?.toLowerCase().replace(/\s+/g, '-')}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-condition" className="text-right">
                Kondisi
              </Label>
              <Select defaultValue={editingItem?.condition?.toLowerCase().replace(/\s+/g, '-')}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih kondisi" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition.toLowerCase().replace(/\s+/g, '-')}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Deskripsi
              </Label>
              <Textarea 
                id="edit-description" 
                defaultValue={editingItem?.description}
                placeholder="Masukkan deskripsi item" 
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUpdateItem}>
              Simpan Perubahan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}