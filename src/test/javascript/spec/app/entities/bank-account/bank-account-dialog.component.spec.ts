/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleGatewayTestModule } from '../../../test.module';
import { BankAccountDialogComponent } from '../../../../../../main/webapp/app/entities/bank-account/bank-account-dialog.component';
import { BankAccountService } from '../../../../../../main/webapp/app/entities/bank-account/bank-account.service';
import { BankAccount } from '../../../../../../main/webapp/app/entities/bank-account/bank-account.model';

describe('Component Tests', () => {

    describe('BankAccount Management Dialog Component', () => {
        let comp: BankAccountDialogComponent;
        let fixture: ComponentFixture<BankAccountDialogComponent>;
        let service: BankAccountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleGatewayTestModule],
                declarations: [BankAccountDialogComponent],
                providers: [
                    BankAccountService
                ]
            })
            .overrideTemplate(BankAccountDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankAccountDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankAccountService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BankAccount(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bankAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bankAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BankAccount();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bankAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'bankAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
