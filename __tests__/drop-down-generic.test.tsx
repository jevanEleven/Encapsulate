import { render } from '@testing-library/react';
import GenericDropDown from '@/components/ui/drop-down-generic';

describe('GenericDropDown', () => {
  it('renders correctly', () => {
    const { container } = render(
      <GenericDropDown
        stateObject="foo"
        updateState={() => {}}
        options={['Foo', 'Bar', 'Baz']}
        label="Label"
      />
    );

    expect(container).toMatchSnapshot();
  });
});