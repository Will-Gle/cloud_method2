export class DateFormatter {
  convertDate(dateString: string): string {
    const dateParts = dateString.split(' ')[0].split('-');
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  }
}
