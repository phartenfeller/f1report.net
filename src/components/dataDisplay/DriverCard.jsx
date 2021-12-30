import React from 'react';
import PropTypes from 'prop-types';
import CardRank from './CardRank';
import useDriverIndex from '../../hooks/useDriverIndex';
import CardWrapper from './CardWrapper';

const DriverCard = ({ list, accessor, header, note = null }) => {
  const { getDriver } = useDriverIndex();
  const sortedList = list.sort((a, b) => a.rank - b.rank);

  if (!list) return <></>;

  return (
    <CardWrapper note={note}>
      <h3 className="font-bold text-xl mb-6 tracking-wide text-zinc-900">
        {header}
      </h3>
      <ol>
        {sortedList.map((p, i) => {
          const { driverDisplayName } = getDriver(p.driverId);

          return (
            <CardRank
              key={p.rank}
              rank={p.rank}
              name={driverDisplayName}
              value={p[accessor]}
              last={i === list.length - 1}
            />
          );
        })}
      </ol>
    </CardWrapper>
  );
};

DriverCard.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
  accessor: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  note: PropTypes.string,
};

DriverCard.defaultProps = {
  note: null,
};

export default DriverCard;
