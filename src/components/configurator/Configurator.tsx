import React from 'react';
import { useConfigurator } from './useConfigurator';
import { ServiceSelector } from './ServiceSelector';
import { ServiceTypeToggle } from './ServiceTypeToggle';
import { ResidentialUnitsInput } from './ResidentialUnitsInput';
import { services } from './data';

export default function Configurator() {
  const {
    state,
    updateService,
    updatePropertySize,
    updateFrequency,
    updateServiceType,
    updateResidentialUnits,
    calculateTotal,
    reset
  } = useConfigurator();

  const availableServices = services.filter(
    service => service.type === state.serviceType
  );

  return (
    <section className="py-16 bg-gray-50" id="configurator">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-900">
          Angebot berechnen
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Kalkulieren Sie hier Ihr individuelles Angebot für unsere Dienstleistungen.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ServiceTypeToggle
              value={state.serviceType}
              onChange={updateServiceType}
            />

            {state.serviceType === 'cleaning' ? (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Raumgröße</h3>
                  <input
                    type="number"
                    min="1"
                    value={state.propertySize}
                    onChange={(e) => updatePropertySize(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-2 text-gray-600">m²</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Häufigkeit</h3>
                  <select
                    value={state.frequency}
                    onChange={(e) => updateFrequency(e.target.value as any)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="weekly">Wöchentlich (10% Rabatt)</option>
                    <option value="biweekly">Alle zwei Wochen (5% Rabatt)</option>
                    <option value="monthly">Monatlich</option>
                  </select>
                </div>
              </>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Immobilienverwaltung</h3>
                <p className="text-gray-600 mb-4">
                  Geben Sie die Anzahl der zu verwaltenden Wohneinheiten ein. Für die Verwaltung von Wohneinheiten fallen zusätzliche Kosten an.
                </p>
                <ResidentialUnitsInput
                  value={state.residentialUnits || 0}
                  onChange={updateResidentialUnits}
                />
                <p className="mt-4 text-gray-600">
                  Der Grundpreis beträgt CHF 2'000, und jede Einheit wird mit CHF 500 berechnet.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {availableServices.map((service) => (
                <ServiceSelector
                  key={service.id}
                  service={service}
                  quantity={state.selectedServices[service.id] || 0}
                  onQuantityChange={(quantity) => updateService(service.id, quantity)}
                />
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-xl font-semibold mb-6 text-blue-900">
              Ihre Auswahl
            </h3>

            <div className="space-y-4 mb-6">
              {state.serviceType === 'cleaning' ? (
                Object.entries(state.selectedServices).map(([serviceId, quantity]) => {
                  const service = services.find(s => s.id === serviceId);
                  if (service && quantity > 0) {
                    return (
                      <div key={serviceId} className="flex flex-col space-y-1">
                        <div className="flex justify-between">
                          <span>{service.name}</span>
                          <span>{quantity} × {state.propertySize} m²</span>
                        </div>
                        <div className="text-sm text-gray-500 text-right">
                          Gesamt: {quantity * state.propertySize} m²
                        </div>
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <span>Grundgebühr</span>
                    <span>CHF 2'000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wohneinheiten ({state.residentialUnits || 0})</span>
                    <span>CHF {(state.residentialUnits || 0) * 500}</span>
                  </div>
                </div>
              )}
              <div className="flex justify-between font-medium pt-4 border-t">
                <span>{state.serviceType === 'cleaning' ? 'Monatliche Kosten' : 'Jährliche Kosten'}</span>
                <span>CHF {calculateTotal()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Angebot anfragen
              </button>
              <button
                onClick={reset}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

