import { useState, useEffect, useCallback } from "react";
import type { RegionSpec, ListItem } from "../ui-types";
import * as dataStore from "../dataStore";

/**
 * Custom hooks for data management with automatic re-rendering
 */

// Hook to manage regions
export function useRegions() {
  const [regions, setRegions] = useState<RegionSpec[]>(dataStore.getRegions());

  const refresh = useCallback(() => {
    setRegions(dataStore.getRegions());
  }, []);

  const addRegion = useCallback((region: RegionSpec) => {
    dataStore.addRegion(region);
    refresh();
  }, [refresh]);

  const updateRegion = useCallback((id: string, updates: Partial<RegionSpec>) => {
    dataStore.updateRegion(id, updates);
    refresh();
  }, [refresh]);

  const deleteRegion = useCallback((id: string) => {
    dataStore.deleteRegion(id);
    refresh();
  }, [refresh]);

  return { regions, addRegion, updateRegion, deleteRegion, refresh };
}

// Hook to manage items for a specific region
export function useRegionItems(regionId: string | undefined) {
  const [items, setItems] = useState<ListItem[]>([]);

  const refresh = useCallback(() => {
    if (regionId) {
      setItems(dataStore.getRegionItems(regionId));
    }
  }, [regionId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addItem = useCallback((item: ListItem) => {
    if (regionId) {
      dataStore.addItem(regionId, item);
      refresh();
    }
  }, [regionId, refresh]);

  const updateItem = useCallback((itemId: string, updates: Partial<ListItem>) => {
    if (regionId) {
      dataStore.updateItem(regionId, itemId, updates);
      refresh();
    }
  }, [regionId, refresh]);

  const deleteItem = useCallback((itemId: string) => {
    if (regionId) {
      dataStore.deleteItem(regionId, itemId);
      refresh();
    }
  }, [regionId, refresh]);

  return { items, addItem, updateItem, deleteItem, refresh };
}

// Hook for data import/export
export function useDataManagement() {
  const exportData = useCallback(() => {
    return dataStore.exportData();
  }, []);

  const importData = useCallback((jsonString: string) => {
    return dataStore.importData(jsonString);
  }, []);

  const resetData = useCallback(() => {
    dataStore.resetData();
    window.location.reload(); // Reload to reflect changes
  }, []);

  const downloadBackup = useCallback(() => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `innomachina-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [exportData]);

  const uploadBackup = useCallback((file: File) => {
    return new Promise<boolean>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const success = importData(content);
        if (success) {
          window.location.reload(); // Reload to reflect changes
        }
        resolve(success);
      };
      reader.onerror = () => resolve(false);
      reader.readAsText(file);
    });
  }, [importData]);

  return { exportData, importData, resetData, downloadBackup, uploadBackup };
}
