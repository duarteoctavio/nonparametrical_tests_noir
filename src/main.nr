fn is_sorted<let N: u32>(array: [ u8; N ]) {
    for i in 1..array.len() {
        assert(array[i] >= array[i-1]);
    };
}

fn set_contains_elem<let N: u32>(set: [u8;N] , elem: u8 ) -> bool {
    let mut output = false;
    for e in set {
        if e == elem {
            output = true
        }
    }
    output
}

struct SamplePosition {
    sample_value: u8,
    amount_of_samples: u8,
    first_index: u8,
    last_index: u8,
}

// NOTE while it's tempting to use a remainder array, it would have the same length padded with 0s, as we are forced to use a fixed size. Therefore, we opt for just reusing the same array.
// NOTE only works on sorted arrays.
fn group_equals<let N: u32>(sample_value: u8, array: [u8;N]) -> SamplePosition {
    let mut amount: u8 = 0;
    let mut first_index: u8 = 0;
    let mut last_index: u8 = 0;
    let mut bumped_on = false;
    for index in 0..array.len() {
        let current = array[index];
        if current == sample_value {
            amount+=1;
            last_index = index as u8;
            if !bumped_on {
                bumped_on = true;
                first_index = index as u8;
            };
        }
    };
    SamplePosition {
        sample_value,
        amount_of_samples: amount,
        first_index,
        last_index
    }
}

fn average<let N: u32>(array: [u32; N]) -> u32 {
    array.reduce(|a,b| a + b) / array.len()
}

// fn range_average(min: u8, max: u8, size: u32) -> u32 {
//     let size = ( max - min ) + 1;
//     let output = [0; size];
//     let index = 0;
//     for elem in min..=max {
//         output[index] = elem;
//         index += 1;
//     };
//     average(output)
// }

// fn assign_wilcox_scores<let N: u32>(sorted_array: [u8; N]) -> [SamplePosition; N] {
//     // following functions assume sorted data.
//     is_sorted(sorted_array);

//     let sample_positions = sorted_array.map(|e| group_equals(e, sorted_array));
//     // we need to skip the repeated sample positions.
//     // TODO find something better than this horrible hack to initialize this variable, is there a NaN?
//     let mut output = [u8 ; sorted_array.len()];
//     let mut last_observed = sorted_array[0] + 1;
//     for positions in sample_positions {
//         if positions.sample_value != last_observed {
//             last_observed = positions.sample_value;
//             let 
//             for index in positions.first_index..=positions.last_index {
//             }
//         };
//     };
// }

#[test]
fn test_is_sorted() {
    is_sorted([0,1,2,3,4]);
}

#[test]
fn test_group_equals() {
    let position = group_equals(2, [1,2,2,3,4]);
    assert(position.amount_of_samples == 2);
}

#[test]
fn test_set_contains_elem() {
    let example = [1,2,3,4,5];
    assert( set_contains_elem(example,1) );
}

#[test]
fn test_average() {
    assert(average([4,5,6]) == 5);
    assert(average([4]) == 4);
}

// fn test_range_average() {
//     assert(range_average(4,6) == 5);
// }
