export type ClassName = string;

export type ClassParam = Record<ClassName, boolean>;

const classNames = (classItems: Array<ClassName | ClassParam>) =>
  classItems
    .flatMap((classItem) => {
      if (typeof classItem === 'string') {
        return classItem.trim();
      }
      if (typeof classItem === 'object') {
        return Object.entries(classItem).map(([className, classCondition]) =>
          classCondition ? className : ''
        );
      }
      return '';
    })
    .join(' ');

export default classNames;
