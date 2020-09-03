import java.util.ArrayList;
import java.util.Iterator;

public class denemeListe {
    public static void main(String[] args) {

        ArrayList<Integer> list = new ArrayList<>();
        list.add(24);
        list.add(2);
        list.add(4);
        list.add(42);

        /*
         * System.out.println("Normal Foreach Listeleme"); for (Integer deger : list) {
         * System.out.println(deger); }
         * 
         * System.out.println("\nIterator Listeleme"); Iterator<Integer> gezici =
         * list.iterator(); while (gezici.hasNext()) {
         * System.out.println(gezici.next()); }
         * 
         * System.out.println("\nLamda Foreach Listeleme");
         * list.forEach(System.out::println);
         * 
         * System.out.println("\nLamda Foreach Listeleme 2"); list.forEach((x) ->
         * System.out.println(x));
         */

        for (Integer deger : list) {
            System.out.println(deger);
        }

        Iterator<Integer> gezici = list.iterator();
        list.add(66);
        while (gezici.hasNext()) {
            System.out.println(gezici.next());
        }

        list.forEach(System.out::println);

        list.forEach((x) -> System.out.println(x));
    }
}