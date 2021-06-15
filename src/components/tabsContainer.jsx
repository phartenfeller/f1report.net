import PropTypes from 'prop-types';
import React, { useState } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TabsContainer = ({ tabs, defaultTabId }) => {
  const [active, setActive] = useState(defaultTabId);

  return (
    <div>
      <div>
        <div className="border-b border-gray-200">
          <nav
            className="-mb-px flex flex-wrap space-x-2 md:space-x-4 lg:space-x-8"
            aria-label="Tabs"
          >
            {tabs.map(({ tabId, tabName }) => (
              <button
                type="button"
                key={tabId}
                onClick={() => setActive(tabId)}
                className={classNames(
                  tabId === active
                    ? 'border-red-400 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-xs lg:font-medium text-sm focus:outline-none focus:ring-1 focus:ring-red-300'
                )}
                aria-current={tabId === active ? 'page' : undefined}
              >
                {tabName}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {tabs.map(
        ({ component, tabId }) =>
          active === tabId && <div key={tabId}>{component}</div>
      )}
    </div>
  );
};

TabsContainer.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.element.isRequired,
      tabId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      tabName: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultTabId: PropTypes.number.isRequired,
};

export default TabsContainer;
