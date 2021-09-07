import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classNames from '../util/classNames';

const TabsContainer = ({ tabs, defaultTabId }) => {
  const [active, setActive] = useState(defaultTabId);

  return (
    <div>
      <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex flex-wrap select-none" aria-label="Tabs">
            {tabs.map(({ tabId, tabName }, i) => (
              <button
                type="button"
                key={tabId}
                onClick={() => setActive(tabId)}
                className={classNames(
                  tabId === active
                    ? 'border-red-400 text-red-700'
                    : 'border-transparent text-gray-600 hover:text-black hover:border-gray-300',
                  i === 0 ? 'pr-2 lg:pr-4' : 'px-2 lg:px-4 xl:px-8',
                  'whitespace-nowrap py-4 px-1 border-b-2 lg:border-b-4 font-xs lg:font-medium text-sm lg:text-base xl:text-lg focus:outline-none focus:ring-1 focus:ring-red-300'
                )}
                aria-current={tabId === active ? 'page' : undefined}
              >
                {tabName}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {tabs.map(({ component, tabId }) => (
        <div
          key={tabId}
          data-tab={tabId}
          className={active === tabId ? 'block' : 'hidden'}
        >
          {component}
        </div>
      ))}
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
