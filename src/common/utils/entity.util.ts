import { DataSource } from 'typeorm';

export class EntityUtils {
  static isColumnPresent<Entity>(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    entity: Function,
    propertyName: keyof Entity,
  ): boolean {
    const metadata = dataSource.getMetadata(entity);
    const columnNames = metadata.columns.map((column) => column.propertyName);
    return columnNames.includes(propertyName as string);
  }
}
