import { createTickingContext, createSpeedContext } from './contexts';

describe('contexts.ts', ()=>{
	describe('tickingContext methods', ()=>{
		describe('WHEN: The stopTicking method is invoked,', ()=>{
			it('THEN: The gridStore object is set to `false`', ()=>{
				const isTickingStore = {
					set: jest.fn(),
				};

				const context = createTickingContext(isTickingStore);
				context.stopTicking();
				expect(isTickingStore.set).toHaveBeenCalledWith(false);
			});
		});
		describe('WHEN: The startTicking method is invoked,', ()=>{
			it('THEN: The gridStore object is set to `true`', ()=>{
				const isTickingStore = {
					set: jest.fn(),
				};
				const context = createTickingContext(isTickingStore);
				context.startTicking();
				expect(isTickingStore.set).toHaveBeenCalledWith(true);
			});
		});
	});

	describe('createSpeedContext methods', ()=>{
		describe('WHEN: The updateSpeed method is invoked,', ()=>{
			it('THEN: The speedStore is updated with the new speed', ()=>{
				const speedStore = {
					set: jest.fn(),
				};
				const context = createSpeedContext(speedStore);
				context.updateSpeed(5);
				expect(speedStore.set).toHaveBeenCalledWith(5);
			});
		});
	});
});