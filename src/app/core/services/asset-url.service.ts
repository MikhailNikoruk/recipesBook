import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetUrlService {
  private readonly document = inject(DOCUMENT);

  resolve(path: string): string {
    return new URL(path, this.document.baseURI).toString();
  }
}
