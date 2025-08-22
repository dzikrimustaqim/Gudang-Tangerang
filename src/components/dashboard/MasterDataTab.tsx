import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Building2, Package, Edit, Trash2, Search } from 'lucide-react';

export default function MasterDataTab() {
  const [isOPDDialogOpen, setIsOPDDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const opds = [
    {
      id: 1,
      name: 'Diskominfo',
      description: 'Dinas Komunikasi dan Informatika',
      itemCount: 280,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Dinas Kesehatan',
      description: 'Dinas Kesehatan Kota',
      itemCount: 320,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: 3,
      name: 'Dinas Pendidikan',
      description: 'Dinas Pendidikan dan Kebudayaan',
      itemCount: 200,
      isActive: true,
      createdAt: '2024-01-15'
    }
  ];

  const categories = [
    {
      id: 1,
      name: 'Laptop',
      description: 'Komputer laptop dan notebook',
      itemCount: 320,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Printer',
      description: 'Perangkat printer dan scanner',
      itemCount: 180,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: 3,
      name: 'Router',
      description: 'Perangkat jaringan router',
      itemCount: 150,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: 4,
      name: 'Switch',
      description: 'Perangkat jaringan switch',
      itemCount: 120,
      isActive: true,
      createdAt: '2024-01-15'
    },
    {
      id: 5,
      name: 'CCTV',
      description: 'Kamera pengawas dan aksesoris',
      itemCount: 480,
      isActive: true,
      createdAt: '2024-01-15'
    }
  ];

  const AddOPDDialog = () => (
    <Dialog open={isOPDDialogOpen} onOpenChange={setIsOPDDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add OPD
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New OPD</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="opdName" className="text-right">
              Name
            </Label>
            <Input id="opdName" placeholder="e.g., Diskominfo" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="opdDescription" className="text-right">
              Description
            </Label>
            <Textarea id="opdDescription" placeholder="OPD description..." className="col-span-3" />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOPDDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOPDDialogOpen(false)}>
            Add OPD
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AddCategoryDialog = () => (
    <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categoryName" className="text-right">
              Name
            </Label>
            <Input id="categoryName" placeholder="e.g., Laptop" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="categoryDescription" className="text-right">
              Description
            </Label>
            <Textarea id="categoryDescription" placeholder="Category description..." className="col-span-3" />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsCategoryDialogOpen(false)}>
            Add Category
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Master Data Management</h2>
        <p className="text-muted-foreground">Manage organizational units (OPD) and item categories</p>
      </div>

      <Tabs defaultValue="opd" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="opd" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            OPD Management
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="opd" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Organizational Units (OPD)
              </CardTitle>
              <AddOPDDialog />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search OPDs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Items Count</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opds.map((opd) => (
                      <TableRow key={opd.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{opd.name}</TableCell>
                        <TableCell>{opd.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{opd.itemCount} items</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {opd.createdAt}
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
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Item Categories
              </CardTitle>
              <AddCategoryDialog />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Items Count</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{category.itemCount} items</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {category.createdAt}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}