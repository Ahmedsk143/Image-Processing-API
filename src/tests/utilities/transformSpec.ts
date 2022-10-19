import transform from '../../utilities/transform';

describe('Test the transform function', (): void => {
    it('1. Process an existing image to the thumb folder Successfully', (): void => {
        expect(async () => {
            const res = await transform(
                'src/full/wolf.jpg',
                500,
                500,
                'src/thumb/wolf-width=500-height=500.jpg'
            );
            expect(res).toBeTrue();
        });
    });
    it('2.Get a false value when processing a non existing image', (): void => {
        expect(async () => {
            const res = await transform(
                'src/full/itDoeseNotExist.jpg',
                500,
                500,
                'src/thumb/itDoeseNotExist-width=500-height=500.jpg'
            );
            expect(res).toBeFalse();
        });
    });
});
