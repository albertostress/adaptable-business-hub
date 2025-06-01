import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface Sale {
  id: string;
  clientName: string;
  value: number;
  status: 'Proposta' | 'Negociação' | 'Fechado' | 'Perdido';
  product: string;
  date: string;
  salesPerson: string;
  probability: number;
  notes: string;
}

interface SaleFormProps {
  sale?: Sale | null;
  onSave: (sale: Omit<Sale, 'id'>) => void;
  onCancel: () => void;
}

const SaleForm = ({ sale, onSave, onCancel }: SaleFormProps) => {
  const [formData, setFormData] = useState({
    clientName: '',
    value: 0,
    status: 'Proposta' as 'Proposta' | 'Negociação' | 'Fechado' | 'Perdido',
    product: '',
    date: new Date().toISOString().split('T')[0],
    salesPerson: '',
    probability: 50,
    notes: ''
  });

  useEffect(() => {
    if (sale) {
      setFormData({
        clientName: sale.clientName,
        value: sale.value,
        status: sale.status,
        product: sale.product,
        date: sale.date,
        salesPerson: sale.salesPerson,
        probability: sale.probability,
        notes: sale.notes
      });
    }
  }, [sale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{sale ? 'Editar Venda' : 'Nova Venda'}</CardTitle>
              <CardDescription>
                {sale ? 'Atualize as informações da venda' : 'Registre uma nova oportunidade de venda'}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Cliente *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product">Produto/Serviço *</Label>
                <Input
                  id="product"
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Valor (R$) *</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Proposta">Proposta</SelectItem>
                    <SelectItem value="Negociação">Negociação</SelectItem>
                    <SelectItem value="Fechado">Fechado</SelectItem>
                    <SelectItem value="Perdido">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salesPerson">Vendedor *</Label>
                <Input
                  id="salesPerson"
                  value={formData.salesPerson}
                  onChange={(e) => handleInputChange('salesPerson', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="probability">Probabilidade (%)</Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => handleInputChange('probability', parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Detalhes da negociação, próximos passos, etc..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {sale ? 'Atualizar' : 'Salvar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaleForm;
