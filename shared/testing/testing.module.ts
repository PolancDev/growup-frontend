import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiConfigService } from './api-config.service';

export function setupTestingModule() {
  return TestBed.configureTestingModule({
    providers: [
      MessageService,
      ApiConfigService
    ]
  });
}

export const mockRouter = {
  navigate: vi.fn().mockReturnValue(true),
  createUrlTree: vi.fn().mockReturnValue({ url: '/' })
};
